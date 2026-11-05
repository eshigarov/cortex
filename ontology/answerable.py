#!/usr/bin/env python3
"""Гейт answerable: можно ли отвечать по графу — до вызова модели."""
import argparse, collections, sys
from pathlib import Path
from rdflib import Graph, Namespace, URIRef
from rdflib.namespace import RDF

BASE = Path(__file__).resolve().parent
CORE = Namespace("https://cortex.example/ns/core#")
NS = "https://cortex.example"


def load():
    g = Graph()
    for f in ("core.ttl", "taxonomy.skos.ttl", "demo.ttl", "attestations.ttl"):
        p = BASE / f
        if p.exists():
            g.parse(p, format="turtle")
    return g


def certified(g, cls):
    out = []
    for s in g.subjects(RDF.type, CORE[cls]):
        st = list(g.objects(s, CORE.status))
        if st and str(st[0]) == "certified":
            out.append(s)
    return out


def name(g, node):
    for n in g.objects(node, CORE.name):
        return str(n)
    return str(node).rsplit("/", 1)[-1]


def shortest(g, src, dst, max_hops):
    q = collections.deque([(src, [src])])
    seen = {src}
    while q:
        node, path = q.popleft()
        if node == dst:
            return path
        if len(path) > max_hops:
            continue
        neighbours = set()
        for _, _, o in g.triples((node, None, None)):
            if isinstance(o, URIRef):
                neighbours.add(o)
        for s, _, _ in g.triples((None, None, node)):
            neighbours.add(s)
        for nb in neighbours:
            if str(nb).startswith(NS) and nb not in seen:
                seen.add(nb)
                q.append((nb, path + [nb]))
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--need", required=True)
    ap.add_argument("--max-hops", type=int, default=3)
    a = ap.parse_args()
    g = load()
    need = [x.strip() for x in a.need.split(",") if x.strip()]
    picked = []
    for cls in need:
        inst = certified(g, cls)
        if not inst:
            print("НЕТ заверенных экземпляров типа " + cls)
            print("answerable: НЕТ")
            return 1
        picked.append(inst[0])
        print(cls + ": заверенных " + str(len(inst)) + ", беру «" + name(g, inst[0]) + "»")
    path = None
    for i in range(len(picked) - 1):
        p = shortest(g, picked[i], picked[i + 1], a.max_hops)
        if not p:
            print("нет пути между «" + name(g, picked[i]) + "» и «" + name(g, picked[i + 1]) + "»")
            print("answerable: НЕТ")
            return 1
        path = p if path is None else path + p[1:]
    if path is None:
        path = picked
    print("путь: " + " → ".join(name(g, n) for n in path))
    print("answerable: ДА")
    return 0


if __name__ == "__main__":
    sys.exit(main())
