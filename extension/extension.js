"use strict"

// Used for TypeScript JSDoc @types
const vscode = require('vscode')
const {
    HoverProvider,
    Hover
} = require('vscode')

const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

exports.activate = function (context) {
    const diagnostics = vscode.languages.createDiagnosticCollection('niva')
    context.subscriptions.push(diagnostics)

    console.log("[Niva-Lint] Initialized.")


    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('vshexa.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from Niva!')
    })
    // context.subscriptions.push(disposable);

    const provider2 = vscode.languages.registerCompletionItemProvider(
        sel,
        {
            provideCompletionItems(document, position) {
                // get all text until the `position` and check if it reads `console.`
                // and if so then complete if `log`, `warn`, and `error`
                const linePrefix = document.lineAt(position).text.substr(0, position.character)
                if (!linePrefix.endsWith('gavr.')) {
                    return undefined
                }

                return [
                    new vscode.CompletionItem('log', vscode.CompletionItemKind.Method),
                    new vscode.CompletionItem('warn', vscode.CompletionItemKind.Method),
                    new vscode.CompletionItem('error', vscode.CompletionItemKind.Method),
                ]
            }
        },
        '.' // triggered whenever a '.' is being typed
    )

    const provider1 = vscode.languages.registerCompletionItemProvider(
        sel,
        {
            provideCompletionItems(document, position, token, context) {
                return new Promise((resolve, reject) => {
                                reject()

                })
            }
        }
    )

    class NivaDocumentSymbolProvider {
        /**
        * @param {vscode.TextDocument} document
        */
        provideDocumentSymbols(
            document,
            token // vscode.CancellationToken
        )
        // Promise<vscode.DocumentSymbol[]>
        {
            return new Promise((resolve, reject) => {
                        resolve([])
            })
        }
    }

    const providerSymbol = vscode.languages.registerDocumentSymbolProvider(
        sel,
        new NivaDocumentSymbolProvider(),
        { label: 'Niva' }
    )

    /** @implements {HoverProvider} */
    class NivaHoverProvider {
        /**
        * @param {vscode.TextDocument} document
        */
        provideHover(document, position, token) {
            const __range = document.getWordRangeAtPosition(position)
            const __word = document.getText(__range)

            return new Promise((resolve, reject) => {
                        reject()
            })
        }
    }

    const providerHover = vscode.languages.registerHoverProvider(
        sel,
        new NivaHoverProvider()
    )

    context.subscriptions.push(
        provider2, // TODO rename
        provider1, // TODO rename
        providerHover,
        providerSymbol
    )
}
