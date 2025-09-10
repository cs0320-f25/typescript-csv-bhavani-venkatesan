import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const EMPTY_CSV_PATH = path.join(__dirname, "../data/empty.csv");
const COMMAS_CSV_PATH = path.join(__dirname, "../data/commas.csv");
const WHITESPACE_CSV_PATH = path.join(__dirname, "../data/whitespace.csv");
const NUMBERS_CSV_PATH = path.join(__dirname, "../data/numbers.csv");
const EMPTY_FIELDS_CSV_PATH = path.join(__dirname, "../data/empty_fields.csv");
const TRAILING_COMMAS_CSV_PATH = path.join(__dirname, "../data/trailing_commas.csv");
const QUOTES_CSV_PATH = path.join(__dirname, "../data/quotes.csv");
const MISSING_DATA_CSV_PATH = path.join(__dirname, "../data/missing_data.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parseCSV handles empty files", async () => {
  const results = await parseCSV(EMPTY_CSV_PATH)
  expect(results).toHaveLength(0);
});

test("parseCSV handles commas in CSV data", async () => {
  const results = await parseCSV(COMMAS_CSV_PATH)
  expect(results).toHaveLength(4);
  expect(results[0]).toEqual(["Caesar", "Julius", '"veni, vidi, vici"']);
  expect(results[1]).toEqual(["Jaesar", "Culius", '"I came, I saw, I conquered"']);
  expect(results[2]).toEqual(["Roberts", "Ella", '"live, laugh, love"']);
  expect(results[3]).toEqual(["Hoberts", "Ellie", '"hi"']);
});

test("parseCSV handles whitespace", async () => {
  const results = await parseCSV(WHITESPACE_CSV_PATH)
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["Tim", "Nelson", "CSCI 0320", "instructor"]);
  expect(results[1]).toEqual(["Nim", "Telson", "CSCI 0320", "student"]);
  expect(results[2]).toEqual(["Tim Nim", "Nelson", "CSCI 0320 and CSCI 1340", "instructor and mentor"]);
});

test("parseCSV handles numbers", async () => {
  const results = await parseCSV(NUMBERS_CSV_PATH)
  expect(results).toHaveLength(4);
  expect(results[0]).toEqual(["1", "2", "3"]);
  expect(results[1]).toEqual(["4", "5", "6"]);
  expect(results[2]).toEqual(["00", "00", "100"]);
  expect(results[3]).toEqual(["-20", "19", "20.5"]);
});

test("parseCSV handles empty fields", async () => {
  const results = await parseCSV(EMPTY_FIELDS_CSV_PATH)
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "classes", "hobbies"]);
  expect(results[1]).toEqual(["Taylor Swift", "", "singing"]);
  expect(results[2]).toEqual(["Saylor Wift", "", "opera"]);
  expect(results[3]).toEqual(["", "math", "dancing"]);
  expect(results[4]).toEqual(["Emily", "economics", ""]);
});

test("parseCSV handles trailing commas", async () => {  
  const results = await parseCSV(TRAILING_COMMAS_CSV_PATH)
  expect(results).toHaveLength(2);
  expect(results[0]).toEqual(["Tim", "Nelson", "CSCI 0320", "instructor", ""]);
  expect(results[1]).toEqual(["Nim", "Telson", "CSCI 0320", "student", ""]);
});

test("parseCSV handles quotes", async () => {
  const results = await parseCSV(QUOTES_CSV_PATH)
  expect(results).toHaveLength(2);
  expect(results[0]).toEqual(["Julius", "Caesar", 'I said "veni, vidi, vici" to announce my victory']);
  expect(results[1]).toEqual(["Julius", "Caesar", '"I said "veni, vidi, vici" to announce my victory"']);
});

// what to do when data is missing? error?
test("parseCSV handles missing data", async () => {
  const results = await parseCSV(MISSING_DATA_CSV_PATH)
  expect(results).toHaveLength(4);
  expect(results[0]).toEqual(["name", "age", "year"]);
  expect(results[1]).toEqual(["Ella Roberts", "19"]);
  expect(results[2]).toEqual(["Roberto Elliot", "20", "junior"]);
  expect(results[3]).toEqual(["senior"]);
});