# Sprint 1: TypeScript CSV

### Task B: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

1. Identify malformed data (such as mismatched types) through descriptive error messages given by the CSV parser.
2. Parse data that uses different delimiters (e.g. commes, semicolons, spaces, etc.) by taking the delimiter as an input.
3. Extract just the necessary data by taking an optional list of the desired column headers.
4. Handle missing data by returning an empty string when there is no data in a field.
5. Fix functionality for cases when delimiter exists within a quotation.
6. Specify whether or not to include the header row in the parsed data by taking this as an input.

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
    3. As a user, I can extract just the necessary data by giving the parser a list of the desired column headers to make it more robust and avoid dealing with unnecessary data.
    (Extensibility; suggested by me)
    4. As a user, I can use the parser for more complex cases such as when the delimiter exists within a quotation and ensure that it is parsed corectly in such cases.
    (Functionality; suggested by me)


    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    My initial ideas focused mainly on immediate fixes for which I have some idea about how to implement them. This included basic functionality and bugs that I could think of based on the tests I came up with, and some quick improvements that would reduce the hardcoding in the current implementation (mainly through taking more user inputs). The ideas suggested by the LLM with my initial prompt, which was fairly general, were similar to this. I then tried a more specific prompt, going into more detail about the expectations for functionality and extensibility, and it suggested more higher level changes such as streaming APIs, pluggable transformers, async sources, and handling CSVs with different encodings. This gave me a very different perspective as I hadn't thought of these more complex changes earlier, but it also made me realise how LLMs can easily complicate the problem and get more technical than necessary, especially with more detailed prompts.

### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
Used LLM to understand how to expect an error in jest tests.

#### Total estimated time it took to complete project:
4 hours

#### Link to GitHub Repo:  
https://github.com/cs0320-f25/typescript-csv-bhavani-venkatesan