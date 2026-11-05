#!/usr/bin/env python3
"""Проверка онтологии Cortex: парсинг, SHACL, негативные тесты."""
import sys
from pathlib import Path
from rdflib import Graph, Namespace
from pyshacl import validate

BASE = Path(__file__).resolve().parent
CORE = Namespace("https://cortex.example/ns/core#")
EX = Namespace("https://cortex.example/demo/")

DATA_FILES = ("core.ttl", "taxonomy.skos.ttl", "demo.ttl", "attestations.ttl")


def load(*names):
    g = Graph()
    for n in names:
        p = BASE / n
        if p.exists():
            g.parse(p, format="turtle")
    return g


def main():
    print("== загрузка ==")
    for f in DATA_FILES + ("shapes.shacl.ttl",):
        g = load(f)
        print("  " + f + ": " + str(len(g)) + " триплетов")

    data = load(*DATA_FILES)
    shapes = load("shapes.shacl.ttl")

    ok, _, text = validate(data, shacl_graph=shapes, inference="rdfs", abort_on_first=False)
    print("\nSHACL (данные): " + ("соответствует" if ok else "НАРУШЕНИЯ"))
    if not ok:
        print(text[:1500])

    bad1 = Graph()
    bad1.parse(data="""@prefix core: <https://cortex.example/ns/core#> .
    <https://cortex.example/demo/bad-decision> a core:Decision ; core:name "Решение без автора" .""", format="turtle")
    ok1, _, _ = validate(data + bad1, shacl_graph=shapes, inference="rdfs")
    print("негативный тест 1 (решение без автора): " + ("поймали" if not ok1 else "НЕ ПОЙМАЛИ"))

    bad2 = Graph()
    bad2.parse(data="""@prefix core: <https://cortex.example/ns/core#> .
    @prefix ex: <https://cortex.example/demo/> .
    ex:answer-bad a core:Answer ; core:queryText "Почему встала дробилка?" ;
      core:ontologyVersion "0.2.0" ; core:uses ex:doc-reg .""", format="turtle")
    ok2, _, _ = validate(data + bad2, shacl_graph=shapes, inference="rdfs")
    print("негативный тест 2 (ответ по черновику): " + ("поймали" if not ok2 else "НЕ ПОЙМАЛИ"))

    good = len(data)
    return 0 if (ok and not ok1 and not ok2) else 1


if __name__ == "__main__":
    sys.exit(main())
