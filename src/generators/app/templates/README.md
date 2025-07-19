<%
const withoutGenerator = packageName.replace(/generator-/, '');
%>

# TypeScript Scaffolding for Yeoman Generators

This is a Yeoman generator for scaffolding TypeScript projects. It provides a set of templates and best practices for building TypeScript applications.

## Features

- TypeScript support
- Pre-configured project structure
- Built-in best practices

**Note:** You must need to prefix the package name with `generator-` when using it with Yeoman. And if you are using a scoped package, it should be prefixed with `@scope/generator-`.

## Installation

```bash
npm install -g yo
npm install -g <%= packageName %>
```

## Usage

```bash
yo <%= withoutGenerator %>
```

## For Local Development
If you want to develop this generator locally, you can link it globally:

```bash
npm link
```

And to verify that the generator is linked correctly, you can run:

```bash
yo --generators
```

You can unlink it later after you are done with development:

```bash
npm unlink -g <%= packageName %>
```

To verify that the generator is unlinked, you can run:

```bash
npm list -g --depth=0
```


