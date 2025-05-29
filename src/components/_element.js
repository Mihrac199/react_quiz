export function Main({ children }) {

     return <div className="main">{children}</div>;

};


export function Footer({ children }) {

     return <footer>{children}</footer>;

};


export function Loader() {

     return (

          <div className="loader-container">

               <div className="loader"></div>
               <p>Loading questions...</p>

          </div>

     );

};


export function Error() {

     return (

          <p className="error">
               <span>💥</span> There was an error fecthing questions.
          </p>

     );

};