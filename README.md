# DAA Lab · FAT Quick Reference

A small searchable React + Vite + Tailwind question bank. Each card contains a complete, standalone Java `Main` program; the Copy code button copies only that program.

## Run locally

```bash
npm install
npm run dev
```

To create a production build, run `npm run build`.

## Input conventions

Programs read from standard input with `Scanner`. Vertices and edge endpoints are **1-based** unless stated otherwise. Graph inputs use `n m` followed by `m` edges `u v weight` (directed algorithms use directed edges). TSP inputs use an `n × n` cost matrix, except Directed TSP, which uses `n m` and directed weighted edges. Each card's program is independent and can be saved as `Main.java`.
