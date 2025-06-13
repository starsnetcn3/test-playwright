export default function convertPathName({ path }) {
    return path.replace(/\//g, "-").replace(/^-/, "");
}

