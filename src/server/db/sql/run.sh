#!/usr/bin/env sh
psql -h $bloomburger_DB_HOST -U $bloomburger_DB_USER -d bloomburger -a -f src/server/db/sql/0001.sql
