#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <MigrationName>"
  exit 1
fi

dotnet ef migrations add "$1"
dotnet ef database update

