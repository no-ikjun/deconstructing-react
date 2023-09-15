const React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === "function") {
      try {
        return tag(props);
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    var element = { tag, props: { ...props, children } };
    console.log(element);
    return element;
  },
};
const App = () => (
  <div className="good">
    <h1>hello</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias vero in neque adipisci quam laudantium iste, suscipit harum veritatis aspernatur odio reprehenderit, facilis vel ad voluptate
      recusandae, doloremque repudiandae libero.
    </p>
  </div>
);

const render = (reactElementOrStringOrNumber, container) => {
  if (["string", "number"].includes(typeof reactElementOrStringOrNumber)) {
    container.appendChild(document.createTextNode(String(reactElementOrStringOrNumber)));
    return;
  }
  const actualDomElement = document.createElement(reactElementOrStringOrNumber.tag);
  if (reactElementOrStringOrNumber.props) {
    Object.keys(reactElementOrStringOrNumber.props)
      .filter((key) => key !== "children")
      .forEach((key) => (actualDomElement[key] = reactElementOrStringOrNumber.props[key]));
  }
  if (reactElementOrStringOrNumber.props.children) {
    reactElementOrStringOrNumber.props.children.forEach((child) => render(child, actualDomElement));
  }
  container.appendChild(actualDomElement);
};

render(<App />, document.getElementById("app"));
