const { useEffect, useState } = React;
const { Subscription, interval } = rxjs;
const { map } = rxjs.operators;
const { toast } = toast;

const App = ({ $ }) => {
  const [data, setData] = useState('0');
  useEffect(() => {
    const subscription = new Subscription();

    const sub = $.subscribe({
      next: v => toast(v),
      complete: () => console.log('Data stream complete'),
    });

    subscription.add(sub);

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="card-body">
      <h5 className="card-title">Counter</h5>
      <p className="card-text">Count: {data}</p>
      <a href="#" className="btn btn-primary" onClick={() => alert('yay')} >Do something</a>
    </div>
  );
}

ReactDOM.render(<App $={interval(1000).pipe(
  map(v => v.toString())
)} />, document.getElementById('app-2'));
