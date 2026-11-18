import { readContent, validateContent } from "@/lib/content/validate";

const errors = validateContent(readContent(process.cwd()));

if (errors.length) {
    console.error(`Content validation failed (${errors.length}):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
}

console.log("Content validation passed.");
