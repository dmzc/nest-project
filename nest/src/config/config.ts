import { join } from "path";
import * as yaml from "js-yaml"
import { readFile } from "fs/promises";
export default async () => {
    const configFilePath = join(process.cwd(), "src/config/config.yaml");
    const config = await readFile(configFilePath, {
        encoding: "utf-8"
    });
    console.log(config)
    return yaml.load(config);
}

