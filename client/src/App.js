import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./styles/App.scss";

class App extends Component {
  render() {
    return (

        <Router>
          <Switch>
            <>
              <div className="App">
                <Route path="/">
                  <header className="header">
                    <Route path="/" component={NavBar} />
                  </header>
                  <section className='page'>

                    <div className='homepage-content'>
                      Home

                      Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Morbi a lectus arcu. Sed sed placerat
                      mauris, quis lobortis massa. Nullam lacus justo, ullamcorper rutrum
                      massa egestas, rutrum aliquet sem. Maecenas augue dolor, laoreet
                      quis lacinia vitae, gravida at nunc. Etiam rutrum auctor est, ut
                      semper urna maximus elementum. Quisque eu tellus id odio feugiat
                      blandit sit amet eu diam. Etiam lorem sapien, dapibus ac felis et,
                      ornare dapibus lorem. In vitae vulputate ligula. Nullam ultrices
                      libero et fringilla rhoncus. Pellentesque luctus, tortor eget
                      feugiat viverra, ex nibh aliquam risus, eu placerat elit lorem in
                      sem. Nulla ut lorem felis. Pellentesque scelerisque mauris urna, eu
                      efficitur neque lacinia sit amet. Etiam vestibulum nunc et nisl
                      ultrices, et feugiat sem egestas. Nullam pulvinar a est sodales
                      vehicula. Duis a orci id nisi tincidunt fringilla. Cras auctor sem
                      nec ipsum ultrices luctus. Duis ut arcu vitae justo luctus lobortis.
                      Vivamus eget faucibus tellus. Donec eleifend enim ex, id hendrerit
                      orci mollis eget. Duis efficitur leo sit amet tellus consectetur,
                      rhoncus ultrices felis dignissim. Pellentesque cursus eu felis ac
                      imperdiet. Quisque a dolor pharetra, imperdiet eros sit amet,
                      euismod purus. Aenean sed nisl eu ligula blandit aliquet. Mauris
                      tincidunt sapien in sem fringilla, a malesuada mauris dictum. Nulla
                      lacinia velit a odio efficitur, nec convallis libero lacinia. Cras
                      eleifend varius feugiat. Vestibulum tincidunt, ex ac tristique
                      auctor, augue nibh lacinia risus, et sagittis nisi nisl congue
                      felis. Aenean et arcu erat. Sed lobortis sapien quis congue maximus.
                      Vestibulum justo augue, convallis a tristique quis, finibus gravida
                      enim. Nunc ut leo eu elit gravida ullamcorper. Pellentesque habitant
                      morbi tristique senectus et netus et malesuada fames ac turpis
                      egestas. Integer sed aliquam nisi. Vivamus ornare semper posuere.
                      Morbi scelerisque hendrerit dignissim. Nam vitae ex sagittis,
                      maximus eros vitae, vulputate dolor. Class aptent taciti sociosqu ad
                      litora torquent per conubia nostra, per inceptos himenaeos. Quisque
                      ut ex luctus, posuere sem vitae, pellentesque dui. Aliquam porta
                      justo enim, eu efficitur erat cursus ac. Morbi in erat vel libero
                      rhoncus porttitor. Curabitur ligula nisl, luctus id neque vel,
                      accumsan accumsan sem. Maecenas ornare pretium fermentum. Praesent
                      ligula sem, euismod eu ex in, luctus fermentum mi. Cras egestas
                      neque dapibus sem volutpat, non sagittis tortor ultricies. Cras
                      facilisis tellus est, vel malesuada eros blandit et. Vivamus sit
                      amet sapien porttitor, pharetra risus tempor, interdum lacus.
                      Aliquam cursus arcu ligula, vestibulum venenatis nibh egestas eu.
                      Integer luctus tortor felis, nec auctor risus consequat non.
                      Phasellus vehicula in ipsum vel imperdiet. Curabitur eu vehicula
                      sapien. Nunc bibendum ultricies felis ut efficitur. Suspendisse in
                      vestibulum nisi, vitae iaculis dui. Nunc lectus nunc, mollis ut
                      volutpat mattis, sagittis nec ex. Vivamus gravida massa sed
                      porttitor interdum. Aenean nec est vitae dui bibendum dapibus. Sed
                      sed tincidunt diam. Donec varius leo non dapibus consequat.
                      Curabitur eu porta purus, ut mattis justo. Sed porttitor felis eu
                      magna euismod, in gravida neque aliquam. Phasellus sit amet odio
                      ipsum. Praesent accumsan libero sed lobortis bibendum. Ut placerat
                      diam eros, sit amet molestie ipsum elementum id. Aliquam vel aliquet
                      ex, in imperdiet turpis. Quisque in pharetra massa, sit amet posuere
                      ligula. In gravida odio efficitur turpis malesuada, a aliquam turpis
                      dictum. Morbi eget faucibus metus, et luctus nunc. Donec id
                      tincidunt mauris. Vestibulum interdum eros purus, at scelerisque
                      ipsum porta vitae. Etiam tincidunt est eget leo cursus, nec dictum
                      tellus placerat. Cras vehicula ornare dolor, a posuere mi fringilla
                      ac. Cras fringilla dignissim risus, et vehicula purus pellentesque
                      eu. Duis hendrerit metus et sem bibendum faucibus. Suspendisse
                      malesuada eros ut lectus mattis tincidunt. Pellentesque finibus
                      massa a gravida euismod. Vivamus vulputate vitae urna quis
                      consectetur. Suspendisse gravida mollis iaculis. Maecenas tristique
                      risus a nisi rutrum rhoncus. Maecenas ut odio urna. Vestibulum
                      hendrerit porttitor diam, et maximus purus auctor id. Mauris commodo
                      suscipit ligula id molestie. Quisque porta aliquet nulla non
                      lacinia. Cras tincidunt, nibh et egestas iaculis, purus diam
                      fermentum eros, viverra dignissim dui eros vel eros. Nunc et
                      scelerisque odio. Aenean viverra enim ac cursus blandit. Cras sit
                      amet ante vel lacus viverra pellentesque. Suspendisse orci elit,
                      pellentesque vitae mattis a, accumsan id diam.
                      Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Morbi a lectus arcu. Sed sed placerat
                      mauris, quis lobortis massa. Nullam lacus justo, ullamcorper rutrum
                      massa egestas, rutrum aliquet sem. Maecenas augue dolor, laoreet
                      quis lacinia vitae, gravida at nunc. Etiam rutrum auctor est, ut
                      semper urna maximus elementum. Quisque eu tellus id odio feugiat
                      blandit sit amet eu diam. Etiam lorem sapien, dapibus ac felis et,
                      ornare dapibus lorem. In vitae vulputate ligula. Nullam ultrices
                      libero et fringilla rhoncus. Pellentesque luctus, tortor eget
                      feugiat viverra, ex nibh aliquam risus, eu placerat elit lorem in
                      sem. Nulla ut lorem felis. Pellentesque scelerisque mauris urna, eu
                      efficitur neque lacinia sit amet. Etiam vestibulum nunc et nisl
                      ultrices, et feugiat sem egestas. Nullam pulvinar a est sodales
                      vehicula. Duis a orci id nisi tincidunt fringilla. Cras auctor sem
                      nec ipsum ultrices luctus. Duis ut arcu vitae justo luctus lobortis.
                      Vivamus eget faucibus tellus. Donec eleifend enim ex, id hendrerit
                      orci mollis eget. Duis efficitur leo sit amet tellus consectetur,
                      rhoncus ultrices felis dignissim. Pellentesque cursus eu felis ac
                      imperdiet. Quisque a dolor pharetra, imperdiet eros sit amet,
                      euismod purus. Aenean sed nisl eu ligula blandit aliquet. Mauris
                      tincidunt sapien in sem fringilla, a malesuada mauris dictum. Nulla
                      lacinia velit a odio efficitur, nec convallis libero lacinia. Cras
                      eleifend varius feugiat. Vestibulum tincidunt, ex ac tristique
                      auctor, augue nibh lacinia risus, et sagittis nisi nisl congue
                      felis. Aenean et arcu erat. Sed lobortis sapien quis congue maximus.
                      Vestibulum justo augue, convallis a tristique quis, finibus gravida
                      enim. Nunc ut leo eu elit gravida ullamcorper. Pellentesque habitant
                      morbi tristique senectus et netus et malesuada fames ac turpis
                      egestas. Integer sed aliquam nisi. Vivamus ornare semper posuere.
                      Morbi scelerisque hendrerit dignissim. Nam vitae ex sagittis,
                      maximus eros vitae, vulputate dolor. Class aptent taciti sociosqu ad
                      litora torquent per conubia nostra, per inceptos himenaeos. Quisque
                      ut ex luctus, posuere sem vitae, pellentesque dui. Aliquam porta
                      justo enim, eu efficitur erat cursus ac. Morbi in erat vel libero
                      rhoncus porttitor. Curabitur ligula nisl, luctus id neque vel,
                      accumsan accumsan sem. Maecenas ornare pretium fermentum. Praesent
                      ligula sem, euismod eu ex in, luctus fermentum mi. Cras egestas
                      neque dapibus sem volutpat, non sagittis tortor ultricies. Cras
                      facilisis tellus est, vel malesuada eros blandit et. Vivamus sit
                      amet sapien porttitor, pharetra risus tempor, interdum lacus.
                      Aliquam cursus arcu ligula, vestibulum venenatis nibh egestas eu.
                      Integer luctus tortor felis, nec auctor risus consequat non.
                      Phasellus vehicula in ipsum vel imperdiet. Curabitur eu vehicula
                      sapien. Nunc bibendum ultricies felis ut efficitur. Suspendisse in
                      vestibulum nisi, vitae iaculis dui. Nunc lectus nunc, mollis ut
                      volutpat mattis, sagittis nec ex. Vivamus gravida massa sed
                      porttitor interdum. Aenean nec est vitae dui bibendum dapibus. Sed
                      sed tincidunt diam. Donec varius leo non dapibus consequat.
                      Curabitur eu porta purus, ut mattis justo. Sed porttitor felis eu
                      magna euismod, in gravida neque aliquam. Phasellus sit amet odio
                      ipsum. Praesent accumsan libero sed lobortis bibendum. Ut placerat
                      diam eros, sit amet molestie ipsum elementum id. Aliquam vel aliquet
                      ex, in imperdiet turpis. Quisque in pharetra massa, sit amet posuere
                      ligula. In gravida odio efficitur turpis malesuada, a aliquam turpis
                      dictum. Morbi eget faucibus metus, et luctus nunc. Donec id
                      tincidunt mauris. Vestibulum interdum eros purus, at scelerisque
                      ipsum porta vitae. Etiam tincidunt est eget leo cursus, nec dictum
                      tellus placerat. Cras vehicula ornare dolor, a posuere mi fringilla
                      ac. Cras fringilla dignissim risus, et vehicula purus pellentesque
                      eu. Duis hendrerit metus et sem bibendum faucibus. Suspendisse
                      malesuada eros ut lectus mattis tincidunt. Pellentesque finibus
                      massa a gravida euismod. Vivamus vulputate vitae urna quis
                      consectetur. Suspendisse gravida mollis iaculis. Maecenas tristique
                      risus a nisi rutrum rhoncus. Maecenas ut odio urna. Vestibulum
                      hendrerit porttitor diam, et maximus purus auctor id. Mauris commodo
                      suscipit ligula id molestie. Quisque porta aliquet nulla non
                      lacinia. Cras tincidunt, nibh et egestas iaculis, purus diam
                      fermentum eros, viverra dignissim dui eros vel eros. Nunc et
                      scelerisque odio. Aenean viverra enim ac cursus blandit. Cras sit
                      amet ante vel lacus viverra pellentesque. Suspendisse orci elit,
                      pellentesque vitae mattis a, accumsan id diam.
                    </div>
                    

                  </section>
                  
                </Route>
                <Route path="/test">Test</Route>
              </div>
            </>
          </Switch>
        </Router>
    );
  }
}

export default App;
