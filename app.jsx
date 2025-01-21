const { useEffect, useState } = React;
const { Subscription, interval } = rxjs;

const data$ = interval(1000).pipe(
  map(v => v.toString())
);

const App = () => {
  const [data, setData] = useState('0');
  useEffect(() => {
    const subscription = new Subscription();

    const sub = data$.subscribe({
      next: v => setData(v),
      complete: () => console.log('Data stream complete'),
    });

    subscription.add(sub);

    return () => subscription.unsubscribe();
  }, []);

  return <>{data}</>;
}

ReactDOM.render(<App />, document.getElementById('app'));
