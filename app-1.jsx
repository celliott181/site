const { useEffect, useState } = React;
const { Subscription, interval } = rxjs;
const { map } = rxjs.operators;

const App = ({ $ }) => {
  const [data, setData] = useState('0');
  useEffect(() => {
    const subscription = new Subscription();

    const sub = $.subscribe({
      next: v => setData(v),
      complete: () => console.log('Data stream complete'),
    });

    subscription.add(sub);

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div class="card-body">
      <h5 class="card-title">Counter</h5>
      <p class="card-text">Count: {data}</p>
      <a href="#" class="btn btn-primary" onClick={() => alert('yay')} >Do something</a>
    </div>
  );
}

ReactDOM.render(<App $={interval(333).pipe(
  map(v => v.toString())
)} />, document.getElementById('app-1'));
