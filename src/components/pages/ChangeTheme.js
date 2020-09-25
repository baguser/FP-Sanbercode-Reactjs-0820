import { Radio, Row } from 'antd';
import React, { Component } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

class ChangeTheme extends Component {
  static contextType = ThemeContext

  constructor(props) {
    super(props);

    this.state = {
      theme: props.theme
    }
  }

  handleChange = (e) => {
    this.context[1]({
      color: e.target.value
    })
  }

  render() {
    return (
      <Row justify="center" align="middle" style={{height: '100%'}}>
        <Radio.Group
          options={[
            {
              label: 'Aqua',
              value: 'aqua'
            }
          ]}
          onChange={this.handleChange}
          value={this.state.theme}
          optionType="button"
          buttonStyle="solid"
        />
      </Row>
    );
  }
}

export default ChangeTheme;
