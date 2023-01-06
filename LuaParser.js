function luaToJavascript(luaCode) {
    luaCode = luaCode.replace("function", "function ");
    luaCode = luaCode.replace("end", "}");
    luaCode = luaCode.replace("=", "==");
    luaCode = luaCode.replace(/for (.*) do/g, "for ($1) {");
    luaCode = luaCode.replace(/while (.*) do/g, "while ($1) {");
    luaCode = luaCode.replace(/if (.*) then/g, "if ($1) {");
    luaCode = luaCode.replace(/elseif (.*) then/g, "} else if ($1) {");
    luaCode = luaCode.replace(/else/g, "} else {");
    luaCode = luaCode.replace(/print\((.*)\)/g, "console.log($1)");
    luaCode = luaCode.replace(/local (.*) = (.*)/g, "let $1 = $2");
    luaCode = luaCode.replace(/local (.*)/g, "let $1");
    return luaCode;
}

function parseLua(luaCode) {
    const lines = luaCode.split("\n");
    let jsCode = "";

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith("--")) continue;
        jsCode += luaToJavascript(line) + "\n";
    }

    return jsCode;
}

const lua = `
function test()
    local bool = true

    if bool then
        print('Hello, World! bool is true')
    end

    print('Hello, World! bool is not true if above is not ran')
end
`
console.log(parseLua(lua));