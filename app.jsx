const { useEffect, useState } = React;
const { Subscription, interval } = rxjs;

function data() {
  const intervalInMs = 1000; // Emit data points every 1000ms (1 second)
  return interval(intervalInMs);
}

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    const data$ = data();
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
