#!/usr/bin/env python3
"""Заверение узлов онтологии: петля обратной связи.

Пишет в attestations.ttl (отдельный слой), базовые данные не меняет.
Пример:
    python certify.py ex:unit-crusher --by ex:person-ivanov --date 2026-11-05
    python certify.py ex:unit-crusher --status draft
"""
import argparse, datetime, sys
from pathlib import Path
from rdflib import Graph, Namespace, URIRef, Literal
from rdflib.namespace import XSD

BASE = Path(__file__).resolve().parent
ATT = BASE / "attestations.ttl"
CORE = Namespace("https://cortex.example/ns/core#")
EX = Namespace("https://cortex.example/demo/")


def resolve(name):
    if name.startswith("http"):
        return URIRef(name)
    return EX[name.split(":")[-1]]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("node")
    ap.add_argument("--by", default=None)
    ap.add_argument("--date", default=datetime.date.today().isoformat())
    ap.add_argument("--status", default="certified", choices=["certified", "draft", "deprecated"])
    a = ap.parse_args()

    g = Graph()
    g.bind("core", CORE)
    g.bind("ex", EX)
    if ATT.exists():
        g.parse(ATT, format="turtle")

    node = resolve(a.node)
    for p in (CORE.status, CORE.certifiedBy, CORE.certifiedAt):
        g.remove((node, p, None))
    g.add((node, CORE.status, Literal(a.status)))
    if a.status == "certified":
        if not a.by:
            print("нужен --by: кто заверяет", file=sys.stderr)
            return 2
        g.add((node, CORE.certifiedBy, resolve(a.by)))
        g.add((node, CORE.certifiedAt, Literal(a.date, datatype=XSD.date)))

    g.serialize(destination=str(ATT), format="turtle")
    print(a.node + ": статус " + a.status)
    return 0


if __name__ == "__main__":
    sys.exit(main())
