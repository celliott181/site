const { useEffect, useState } = React;
const { Subscription, interval } = rxjs;
const { map } = rxjs.operators;

const Toast = ({ children, level = "info", key }) => {
  return (
    <div className=`alert alert-${level}` key=`alert-${id}` role="alert">
    {children}
    </div>
  );
};

const App = ({ $ }) => {
  const [data, setData] = useState({});
  
  useEffect(() => {
    const subscription = new Subscription();

    const sub = $.subscribe({
      next: v => setData([ ...data.slice(-5), v ]),
      complete: () => console.log('Data stream complete'),
    });

    subscription.add(sub);

    return () => subscription.unsubscribe();
  }, []);

  return <>
    {data.map(v => <Toast key={v}>v</Toast>;
  </>
}

ReactDOM.render(<App $={interval(2000).pipe(
  map(v => v.toString())
)} />, document.getElementById('toasts'));
