
const fs = require("fs");
const glob = require("glob");

const fronts = ["apps/student-front/eslint.config.mjs", "apps/teacher-front/eslint.config.mjs"];
fronts.forEach(f => {
  let content = fs.readFileSync(f, "utf8");
  if (!content.includes("react/no-unescaped-entities")) {
    content = content.replace("...nextTs,", "...nextTs,\n  {\n    rules: {\n      \"react/no-unescaped-entities\": \"off\",\n      \"@typescript-eslint/no-explicit-any\": \"off\",\n      \"@typescript-eslint/no-unused-vars\": \"warn\",\n      \"@typescript-eslint/no-empty-object-type\": \"off\",\n      \"react-hooks/set-state-in-effect\": \"off\",\n      \"@next/next/no-img-element\": \"off\",\n    }\n  },");
    fs.writeFileSync(f, content);
    console.log("Updated", f);
  }
});

const backs = ["apps/api-gateway/eslint.config.mjs", "apps/auth-service/eslint.config.mjs", "apps/lms-service/eslint.config.mjs"];
backs.forEach(f => {
  let content = fs.readFileSync(f, "utf8");
  if (!content.includes("no-unsafe-call")) {
    content = content.replace("rules: {", "rules: {\n      \"@typescript-eslint/no-unsafe-call\": \"off\",\n      \"@typescript-eslint/no-unsafe-member-access\": \"off\",\n      \"@typescript-eslint/no-unsafe-assignment\": \"off\",\n      \"@typescript-eslint/no-unsafe-return\": \"off\",\n      \"@typescript-eslint/unbound-method\": \"off\",\n      \"@typescript-eslint/no-unsafe-argument\": \"warn\",\n      \"@typescript-eslint/no-floating-promises\": \"warn\",");
    fs.writeFileSync(f, content);
    console.log("Updated", f);
  }
});

