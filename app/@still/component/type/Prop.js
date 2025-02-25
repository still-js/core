export function Prop(value) {
    return { value, onlyPropSignature: true };
}

window.Prop = Prop;