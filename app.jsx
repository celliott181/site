const { useEffect, useState } = React;
const { Subscription, interval } = rxjs;

const data$ = interval(1000);

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    const subscription = new Subscription();

    const sub = data$.subscribe({
      next: v => setData(v),
      complete: () => console.log('Data stream complete'),
    });

    subscription.add(sub);

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <h1>App</h1>
      {data}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
