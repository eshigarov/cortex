#!/usr/bin/env bash
# Идемпотентная загрузка онтологии Cortex в Neo4j через n10s.
# Требует: контейнер cortex-neo4j с плагинами APOC и n10s, каталог ontology смонтирован в /import.
set -euo pipefail

CONTAINER="${CONTAINER:-cortex-neo4j}"
USER_NAME="${NEO4J_USER:-neo4j}"
PW_FILE="${NEO4J_PW_FILE:-$HOME/.cache/neo4j/.pw}"

if [ -n "${NEO4J_PASS:-}" ]; then PASS="$NEO4J_PASS";
elif [ -r "$PW_FILE" ]; then PASS="$(cat "$PW_FILE")";
else echo "нет пароля: задай NEO4J_PASS или создай $PW_FILE (chmod 600)"; exit 2; fi

run() { docker exec -i "$CONTAINER" cypher-shell -u "$USER_NAME" -p "$PASS" --format plain "$@"; }

for i in $(seq 1 30); do
  run "RETURN 1;" >/dev/null 2>&1 && break
  sleep 2
done

echo "1/4 constraint"
run "CREATE CONSTRAINT n10s_unique_uri IF NOT EXISTS FOR (r:Resource) REQUIRE r.uri IS UNIQUE;" >/dev/null

echo "2/4 graph config"
if ! run "CALL n10s.graphconfig.show();" >/dev/null 2>&1; then
  run "CALL n10s.graphconfig.init({handleVocabUris:'SHORTEN'});" >/dev/null
fi

echo "3/4 префиксы"
run "CALL n10s.nsprefixes.add('core','https://cortex.example/ns/core#');" >/dev/null 2>&1 || true

echo "4/4 импорт"
for f in core.ttl taxonomy.skos.ttl demo.ttl; do
  out=$(run "CALL n10s.rdf.import.fetch('file:///import/$f','Turtle') YIELD terminationStatus, triplesLoaded RETURN terminationStatus + ':' + triplesLoaded AS r;" 2>&1 | tail -2)
  echo "  $f -> $out"
done

echo "итог:"
run "MATCH (n:Resource) RETURN count(n) AS nodes;" 2>&1 | tail -2
