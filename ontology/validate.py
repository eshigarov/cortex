#!/usr/bin/env python3
"""Проверка онтологии Cortex: парсинг, целостность, SHACL."""
import sys
from pathlib import Path
from rdflib import Graph, Namespace
from pyshacl import validate

BASE = Path(__file__).resolve().parent
CORE = Namespace("https://cortex.example/ns/core#")

def load(*names):
    g = Graph()
    for n in names:
        g.parse(BASE / n, format="turtle")
    return g

def main():
    files = ["core.ttl", "taxonomy.skos.ttl", "shapes.shacl.ttl", "demo.ttl"]
    graphs = {}
    for f in files:
        graphs[f] = load(f)
        print(f"{f}: {len(graphs[f])} триплетов")

    data = load("core.ttl", "taxonomy.skos.ttl", "demo.ttl")
    shapes = load("shapes.shacl.ttl")

    conforms, _, text = validate(data, shacl_graph=shapes, inference="rdfs", abort_on_first=False)
    print("SHACL:", "соответствует" if conforms else "НАРУШЕНИЯ")
    if not conforms:
        print(text[:2000])

    # контрольный негативный пример: решение без автора
    bad = Graph()
    bad.parse(data="""@prefix core: <https://cortex.example/ns/core#> .
    <https://cortex.example/demo/bad> a core:Decision ; core:name "Решение без автора" .""", format="turtle")
    merged = data + bad
    ok, _, _ = validate(merged, shacl_graph=shapes, inference="rdfs")
    print("негативный тест:", "поймали" if not ok else "НЕ ПОЙМАЛИ")
    return 0 if conforms and not ok else 1

if __name__ == "__main__":
    sys.exit(main())
