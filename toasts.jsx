const { useEffect, useState } = React;
const { Subject, Subscription, interval } = rxjs;
const { map } = rxjs.operators;

const Toast = ({ children, level = "info" }) => {
  return (
    <div className={`alert alert-${level}`} role="alert">
      {children}
    </div>
  );
};

const ToastContainer = ({ $ }) => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const subscription = new Subscription();

    const sub = $.subscribe({
      next: v => {
        setData([ ...data.slice(-5), v ]);
        setTimeout(() => setData(data.slice(1-length)), 2000);
      },
      complete: () => console.log('Data stream complete'),
    });

    subscription.add(sub);

    return () => subscription.unsubscribe();
  }, []);

  return <>
    {data.map(v => <Toast key={`alert-${v}`}>{v}</Toast>)}
  </>
}

const toast$ = new Subject();
const toast = (msg) => toast$.next(msg);

ReactDOM.render(<ToastContainer $={toast$} />, document.getElementById('toasts'));
window.toast = toast;
