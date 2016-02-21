/* eslint no-unused-vars:0 */
import React, { PropTypes, Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

class Instructions extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
    this.handleClick = this.handleClick.bind(this);

  }

  componentDidMount(){
    let { dispatch } = this.props;



    dispatch(Actions.quandlRequest({
      databaseCode : "WSJ",
      datasetCode : "MLCHY",
      date : "2016-02-18",
      dataLabel : "Yield"
    }));
  }

  handleClick(e) {
    this.setState({

    });

    e.preventDefault();
  }



  render() {
    return (
      <div>
        <Header onClick={this.handleClick} />
        <div className="container">
          {
            `Getting Started

             ...to be written after we develop it ;)
            `
          }
        </div>
        <Footer />
      </div>
    );
  }
}

// Instructions.need = [() => { return Actions.fetchPosts(); }];
Instructions.contextTypes = {
  router: React.PropTypes.object,
};

function mapStateToProps(store) {
  return {

  };
}

Instructions.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Instructions);
