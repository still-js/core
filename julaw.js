function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => 
                typeof child === "object" ? child : createTextElement(child)
            )
        }
    };
}

function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    };
}

function render(element, container) {
    const dom = element.type === "TEXT_ELEMENT"
        ? document.createTextNode("")
        : document.createElement(element.type);

    // Assign properties
    Object.keys(element.props)
        .filter(key => key !== "children")
        .forEach(name => {
            dom[name] = element.props[name];
        });

    // Render children
    element.props.children.forEach(child => render(child, dom));

    container.appendChild(dom);
}

function useState(initialValue) {
    let state = initialValue;

    function setState(newValue) {
        state = newValue;
        rerender();
    }

    return [state, setState];
}

function rerender() {
    document.getElementById('root').innerHTML = '';
    render(App(), document.getElementById('root'));
}

const App = {
    createElement,
    render,
    useState,
};

export default App;
