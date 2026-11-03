#!/usr/bin/env python3
"""Экспорт демо-графа онтологии в JSON для сайта.

Читает core.ttl (подписи связей), demo.ttl (данные) и пишет
components/ontology-demo.json: узлы, связи и сценарий "путь ответа".
"""
import json
from pathlib import Path
from rdflib import Graph, Namespace, RDF, RDFS

BASE = Path(__file__).resolve().parent
OUT = BASE.parent / "components" / "ontology-demo.json"

CORE = Namespace("https://cortex.example/ns/core#")
TAX = Namespace("https://cortex.example/ns/tax#")
EX = Namespace("https://cortex.example/demo/")

RU = "{http://www.w3.org/2000/01/rdf-schema#}label"


def label_for(g, subject):
    for lit in g.objects(subject, CORE.name):
        return str(lit)
    for lit in g.objects(subject, RDFS.label):
        if getattr(lit, "language", None) == "ru":
            return str(lit)
    for lit in g.objects(subject, RDFS.label):
        return str(lit)
    s = str(subject).split("/")[-1]
    return s


def short(subject):
    s = str(subject)
    for ns, prefix in ((str(CORE), "core:"), (str(TAX), "tax:"), (str(EX), "")):
        if s.startswith(ns):
            return prefix + s[len(ns):]
    return s


def main():
    g = Graph()
    g.parse(BASE / "core.ttl", format="turtle")
    g.parse(BASE / "demo.ttl", format="turtle")

    # подписи свойств и классов
    prop_label = {}
    for s in g.subjects(RDF.type, RDF.Property):
        prop_label[short(s)] = label_for(g, s)
    for s, _, o in g.triples((None, RDF.type, None)):
        if str(o).endswith("ObjectProperty") or str(o).endswith("DatatypeProperty"):
            prop_label[short(s)] = label_for(g, s)

    # узлы: всё, что типизировано классом core
    nodes = {}
    for s, _, o in g.triples((None, RDF.type, None)):
        if not str(o).startswith(str(CORE)):
            continue
        key = short(s)
        nodes[key] = {
            "id": key,
            "label": label_for(g, s),
            "type": short(o).replace("core:", ""),
        }

    # связи между узлами
    edges = []
    for s, p, o in g:
        sk, pk, ok = short(s), short(p), short(o)
        if sk not in nodes or ok not in nodes:
            continue
        edges.append({
            "source": sk,
            "target": ok,
            "predicate": pk,
            "label": prop_label.get(pk, pk),
        })

    story = [
        {"node": "asset-crusher", "caption": "Дробилка КМД-2200 в дробильном цехе"},
        {"node": "event-stop", "caption": "Зафиксирован простой 6 часов", "relation": "влияет на"},
        {"node": "metric-downtime", "caption": "Простои за месяц — 42,5 часа", "relation": "измеряет"},
        {"node": "decision-repair", "caption": "Решение: заменить броню конуса", "relation": "касается"},
        {"node": "person-ivanov", "caption": "Автор — главный механик", "relation": "принято"},
        {"node": "doc-reg", "caption": "Основание — регламент ТО", "relation": "регламентирует"},
    ]

    payload = {
        "question": "Почему выросли простои на дробилке?",
        "nodes": sorted(nodes.values(), key=lambda n: n["id"]),
        "edges": sorted(edges, key=lambda e: (e["source"], e["target"])),
        "story": story,
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"узлов: {len(payload['nodes'])}, связей: {len(payload['edges'])}, шагов: {len(story)}")
    print("записано:", OUT)


if __name__ == "__main__":
    main()
