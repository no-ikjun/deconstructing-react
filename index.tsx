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

const states = [];
let stateCursor = 0;

const useState = (initialState) => {
  const FROZENCURSOR = stateCursor;
  states[FROZENCURSOR] = states[FROZENCURSOR] || initialState;
  const setState = (newState) => {
    states[FROZENCURSOR] = newState;
    rerender();
  };
  stateCursor++;
  return [states[FROZENCURSOR], setState];
};

const App = () => {
  const [name, setName] = useState("ikjun");
  const [count, setCount] = useState(0);
  return (
    <div className="good">
      <h1>Hello, {name}</h1>
      <input type="text" placeholder="name" value={name} onchange={(e) => setName(e.target.value)} />
      <h2>The count is : {count}</h2>
      <button onclick={() => setCount(count + 1)}>+</button>
      <button onclick={() => setCount(count - 1)}>-</button>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa harum perferendis veniam ut accusantium iusto deleniti nemo! Nisi quisquam natus itaque similique, adipisci voluptatum atque ex
        deleniti harum quibusdam inventore!
      </p>
    </div>
  );
};

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

const rerender = () => {
  stateCursor = 0;
  document.getElementById("app").firstChild.remove();
  render(<App />, document.getElementById("app"));
};

render(<App />, document.getElementById("app"));
