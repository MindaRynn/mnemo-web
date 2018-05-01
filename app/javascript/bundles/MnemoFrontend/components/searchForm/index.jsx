import React from "react";
import Autosuggest from 'react-autosuggest';

class SearchForm extends React.Component {

  constructor(props) {
    super(props);
    this._getSuggestions = this._getSuggestions.bind(this);
    this._renderSuggestion = this._renderSuggestion.bind(this);
    
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  _getSuggestionValue(suggestion){
    return suggestion.name;
  }

  _getSuggestions(value) {
    let {allUser} = this.props
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : allUser.filter(user =>
        user.name.toLowerCase().slice(0, inputLength) === inputValue
      );
  };

  _clickHandler(e, userId) {
    window.location = `/profile/${userId}`;
  }

  // Use your imagination to render suggestions.
  _renderSuggestion(suggestion){
    return (
      <div className="suggestion" onClick={e => this._clickHandler(e, suggestion.id)}>
        {suggestion.name}
      </div>
    );
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this._getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search for user Name',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
    <div className="search-container">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this._getSuggestionValue}
        renderSuggestion={this._renderSuggestion}
        inputProps={inputProps}
      />
    </div>
    );
  }
}

export default SearchForm;