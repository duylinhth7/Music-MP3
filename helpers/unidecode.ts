import unidecode from "unidecode";

const unidecodeText = (text: string) : string => {
    const unidecodeText = unidecode(text).trim();
    const slug = unidecodeText.replace(/\s+/g, "-");
    return slug;
}

export default unidecodeText;