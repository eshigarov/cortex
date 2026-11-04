import json, urllib.request, pathlib, time
from neo4j import GraphDatabase

PW = pathlib.Path.home().joinpath('.cache/neo4j/.pw').read_text().strip()
drv = GraphDatabase.driver('bolt://127.0.0.1:7687', auth=('neo4j', PW))

def embed(text):
    req = urllib.request.Request('http://127.0.0.1:11434/api/embeddings',
        data=json.dumps({'model':'nomic-embed-text','prompt':text}).encode(),
        headers={'Content-Type':'application/json'})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)['embedding']

with drv.session() as s:
    rows = s.run('MATCH (n:Resource) WHERE n.`ns0__name` IS NOT NULL RETURN n.uri AS uri, n.`ns0__name` AS name, labels(n) AS labels').data()
    print('узлов с именем:', len(rows))
    for r in rows:
        vec = embed(r['name'])
        s.run('MATCH (n:Resource {uri:$uri}) SET n.embedding = $vec', uri=r['uri'], vec=vec)
    print('эмбеддинги записаны, размерность:', len(embed('тест')))
    s.run('CREATE VECTOR INDEX node_embeddings IF NOT EXISTS FOR (n:Resource) ON (n.embedding) OPTIONS {indexConfig: {`vector.dimensions`: 768, `vector.similarity_function`: `cosine`}}'.replace('`vector','`vector').replace('function`: `cosine`','function`: "cosine"'))
    for _ in range(20):
        st = s.run("SHOW INDEXES YIELD name, state WHERE name = 'node_embeddings' RETURN state").data()
        if st and st[0]['state'] == 'ONLINE': break
        time.sleep(1)
    print('индекс:', st[0]['state'] if st else 'нет')
    q = 'оборудование остановилось, простой несколько часов'
    qv = embed(q)
    hits = s.run('CALL db.index.vector.queryNodes("node_embeddings", 3, $vec) YIELD node, score RETURN node.`ns0__name` AS name, score', vec=qv).data()
    print('\nвекторный поиск по запросу:', q)
    for h in hits: print('  %.3f  %s' % (h['score'], h['name']))
    top = hits[0]['name']
    paths = s.run('''MATCH (n:Resource {`ns0__name`:$name}) MATCH p=(n)-[*1..2]-(m:Resource) RETURN DISTINCT length(p) AS hops, [x IN nodes(p) | coalesce(x.`ns0__name`, '?')] AS path ORDER BY hops LIMIT 5''', name=top).data()
    print('\nобход от ближайшего узла:', top)
    for p in paths: print('  %d хоп(а): %s' % (p['hops'], ' -> '.join(p['path'])))
drv.close()
