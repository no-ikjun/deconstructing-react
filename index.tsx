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

<App />;
