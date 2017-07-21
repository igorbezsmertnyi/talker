import React, { Component } from 'react'
import { connect } from 'react-redux'
import { assistentClear } from '../../actions/assistent'
import style from './style.css'
import SearchModal from './Search'

const modalType = action => {
  switch (action) {
    case '_FIND_STRING':
      return 'search'
    break;
  default:

  }
}

class ResultModal extends Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: false }
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.setState({ isOpen: false })
    this.props.onResCleare()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.assistent.action && !this.state.isOpen) this.setState({ isOpen: true })
  }

  render() {
    let type = modalType(this.props.assistent.action)

    return (
      <div>
        {this.state.isOpen && <div>
          {type === 'search' && <SearchModal assistent={this.props.assistent} handleClick={() => { this.handleClose() }} />}
        </div>}
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
  onResCleare: () => {
    dispatch(assistentClear())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ResultModal)
