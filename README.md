# Sprint 1: TypeScript CSV

### Task B: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

1. Identify malformed data (such as mismatched types) through descriptive error messages given by the CSV parser.
2. Parse data that uses different delimiters (e.g. commes, semicolons, spaces, etc.) by taking the delimiter as an input.
3. Extract just the necessary data by taking an optional list of the desired column headers.
4. Handle missing data by returning an empty string when there is no data in a field.
5. Fix functionality for cases when delimiter exists within a quotation.
6. Specify whether or not to include the header row in the parsed data by taking this as an input.
7. Option to choose how parser should handle invalid data (e.g. skip rows or throw error).

- #### Step 2: Use an LLM to help expand your perspective.
1. Supports different delimiter types, taken as an input.
2. Properly handles newlines: does not include empty lines in the parsed data; handles newlines within quotes or large chunks of data in a field.
3. Allow parsing with or without headers. Also handle duplicate headers (e.g. duplicate ID columns).
4. Type inference, convert columns to specific types, or let users plug in a schema.
5. Handle malformed rows (e.g. row length mismatch, extra / missing commes) by deciding to skip such rows.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    1. As a user, I can identify malformed data (such as mismatched types or empty lines) through descriptive error messages given by the CSV parser so that I can fix these issues to avoid errors when using this data in the future. 
    (Functionality; suggested by both me and the LLM)
    2. As a user, I can use the CSV parser to parse data that uses different delimiters (e.g. commes, semicolons, spaces, etc.) so that it is extensible to more applications and a wider variety of CSV files.
    (Extensibility; suggested by me and the LLM)
    3. As a user, I can choose whether I want the parser to throw an error whenever the data in a row cannot be validated or if I want the parser to just skip invalid rows.
    (Extensibility; suggested by me)
    4. As a user, I can use the parser for more complex cases such as when the delimiter exists within a quotation and ensure that it is parsed corectly in such cases.
    (Functionality; suggested by me)


    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    My initial ideas focused mainly on immediate fixes for which I have some idea about how to implement them. This included basic functionality and bugs that I could think of based on the tests I came up with, and some quick improvements that would reduce the hardcoding in the current implementation (mainly through taking more user inputs). The ideas suggested by the LLM with my initial prompt, which was fairly general, were similar to this. I then tried a more specific prompt, going into more detail about the expectations for functionality and extensibility, and it suggested more higher level changes such as streaming APIs, pluggable transformers, async sources, and handling CSVs with different encodings. This gave me a very different perspective as I hadn't thought of these more complex changes earlier, but it also made me realise how LLMs can easily complicate the problem and get more technical than necessary, especially with more detailed prompts.

### Design Choices
I chose to use Zod's parse() method instead of safeParse() so that the parser ends the program and propagates the error to the caller whenever there is data in the CSV file that does not comply with the schema. It will be the caller's responsibility to catch the error. I considered other options such as skipping the row or returning an error object but I thought it would be safer to make it clear to the caller that there is a problem with the data rather than just omit data that does not meet the schema. In future implementations, the user can make this decision.

### 1340 Supplement

- #### 1. Correctness
- The parser's output always has the same number of columns in each row, and there should be no column that is completely empty.
- If a Zod schema is given to the parser, each row of the parsed data must be valid as per the schema's specifications.
- If no schema is given, fields are not checked for validity and empty fields are parsed as empty strings.
- The delimiter should not be included in the parsed data unless it is within quotations, parentheses, etc.
- The parser never changes the contents of any of the fields, apart from trimming trailing whitespace.

- #### 2. Random, On-Demand Generation
This would help expand testing to different types of data beyond what we initially think of. Since it is randomized, it is less standardized, making it easier to come up with a wider variety of tests. We could also use this to generate a much larger test suite to stress test the parser.

- #### 3. Overall experience, Bugs encountered and resolved

#### Errors/Bugs:
I ran into some type errors when setting the output type of the parser to T[] | string[][] because TypeScript was not able to infer that the results array would only have elements of either T or string[] and that it wouldn't have both types in the same array. To overcome this error, I used an if statement to separately handle the cases when a schema is provided and when it is not provided. This allowed me to specify the type of the results array as either T[] or string[][] instead of having to use a union type.

#### Tests:
I implemented tests for the following cases:
- returns empty array for empty file
- parser handles whitespace within fields correctly
- parser works on fields with positive and negative integers and decimals
- parser represents empty fields as empty strings and does not let empty fields to disrupt parsing / column number of following fields in that row when no schema is provided
- parser treats trailing commas as empty fields
- parser treats quotes with commas within them as a single field
- parser handles quotes within quotes as a single field
- when schema is provided, parser throws error for empty fields, malformed data, and extra fields
- parser works correctly for valid CSVs when schema is provided

Currently, only the tests involving commas within quotes and quotes within quotes are failing because this functionality has not been implemented yet. All other tests are passing.

#### How To…
Run tests using `npm test`

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
- Used LLM to understand how to expect an error in jest tests.
- Used LLM to expand my perspective on the CSV parser's functionality and extensibility (as specified in handout).

Prompts used:

I’m working on a CSV parser in TypeScript that currently accepts a filename as input and converts rows into strings or objects. What are some missing features or edge cases that I should consider? What improvements would make it easier for other developers to use in different kinds of apps? Focus on correctness of the application to ensure good functionality. Also think about extensibility, i.e., how it can be used in different applications


const personSchema = z.tuple([z.string(), z.coerce.number()])
test("parseCSV with person schema", async () => {
  expect(() => parseCSV(PEOPLE_CSV_PATH, personSchema)).toThrow(ZodError)
});
why doesnt this catch the error?


how to expect a general error (not zod)

#### Total estimated time it took to complete project:
6 hours

#### Link to GitHub Repo:  
https://github.com/cs0320-f25/typescript-csv-bhavani-venkatesan