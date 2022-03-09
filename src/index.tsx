import React from 'react';
import ReactDOM from 'react-dom';

import Combobox from './components/Combobox/Combobox';
import './main.scss';
import getMovies from './api/getMovies';
import DeleteButton from './components/DeleteButton/DeleteButton';

const App = () => (
  <article className="app">
    <header className="app__header">
      <h1>Soltia Test Task</h1>
      <span className="app__description">
        Made by
        <address>
          <a className="app__author-data" rel="author" href="https://www.linkedin.com/in/anastasiia-mishunina-5b1280150/">
            Anastasia Mishunina
          </a>
        </address>
        <time>09-03-2022</time>
      </span>
    </header>

    <section>
      <h2>Task 1. Button</h2>
      <DeleteButton />
    </section>
    <section>
      <h2>Task 2. Questions</h2>

      <ol>
        <li>
          <h3>1. How would you describe the difference between HTML, CSS and JavaScript?</h3>
          <p>
            HTML is an instrument to describe page layout for browser engine and search robots.
            HTML helps to says what we want to put on the page.
          </p>
          <p>
            CSS helps to style page contents, to add visual effects
            that provide an opportunity for user to recognize fast and easy what are
            the affordances in the page. E.g. we can add underline and blue color
            to the link so the average user can understand that
            the current element is a link, that they can click on it, and it
            will probably cause redirection to some other page or section.
          </p>
          <p>
            JavaScript is a programming language. And as many programming languages,
            it can be used for various purposes. On web pages it is used for async calls to API,
            for interactive UI elements logic, for manipulations with data and etc.
            JavaScript can be also used as language for creating server apps and even desktop apps.
          </p>
        </li>
        <li>
          <h3>
            2. How would you briefly describe frontend to someone who has no experience of it?
          </h3>
          <p>
            Frontend is all about visual interfaces. An interface is a set of affordances
            that some system provides to their users.
          </p>
          <p>
            You might not think about it, but you use graphic interfaces gazillion times a day.
            For example, GoogleMaps provide you interface for getting the shortest route
            from home to work. You do not need to think about the algorithm, capacity of
            the computer that runs calculations, etc. The system encapsulates all the logic
            inside itself. The only thing you need is the address of start and finish points.
          </p>
          <p>
            Graphic interfaces are a significant part of our life. And web interfaces are
            especially cool because they can be used by various users with different devices.
            The same frontend app can be used with cheap Android smartphones and with
            extremely expensive supercomputers. Frontend developers work on providing
            equal opportunities for differently able people.
          </p>
        </li>
        <li>

          <h3>3. Why is semantically correct HTML important?</h3>
          <p>
            Semantically correct layout is especially important for
            those users who use a screen reader for internet surfing.
            It is much more convenient to navigate through pages when
            all of their parts a marked correctly. When navigation is
            actually marked as nav, when images and icons have readable descriptions,
            when buttons are focusable, and so on.
          </p>
          <p>
            However, not only people but also search robots are parsing
            web pages. And they are trying to understand what is the page content
            to index it and show it in search results. Even if the page looks ok for
            the average user, it cannot be properly understood by the search robot
            without a proper semantic layout. That is why semantics is
            important for everyone.
          </p>
        </li>
      </ol>
    </section>
    <section>
      <h2>Task 3. Search bar</h2>
      <p>
        Would you like to check if there is any movie that title contains some
        particular word or phrase in the IMDb base? You can use this search bar! We will call
        {' '}
        <a href="http://www.omdbapi.com/">OMDb API</a>
        {' '}
        and show you the results.
      </p>
      <p>
        Unfortunately, if there are too many movies
        matching your request, they will not be shown because of the API limitations.
        In that case, try to be more specific in your query.
      </p>

      <p>
        You can navigate through list using arrows on your keyboard.
        To select option click on it or press Enter or Space while option is focused
      </p>

      <Combobox
        historyHeaderLabel="Search History"
        clearHistoryLabel="Clear Search History"
        placeholder="Enter name of movie"
        getOptions={getMovies}
      />
    </section>
  </article>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
