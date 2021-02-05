
import React from 'react';
import  {
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from 'react-native';
import {FiltersTypes} from '../actions/types';
import { connect } from 'react-redux'
import { showAll, showCompleted, showIncomplete } from '../actions/actions'
import { todoFilter } from "../selectors";

function capitalize (word) {
  var lower = word.toLowerCase();
  return lower.slice(0, 1).toUpperCase() + lower.slice(1);
}

class Filter extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.bar}>
        {this.renderFilters()}
      </View>
    );
  }


  renderFilters() {
    const { incompleteTask, filterShow, showAll, showCompleted, showIncomplete} = this.props

    const displayIncomplete = (filter) =>{
      if(incompleteTask.todos.length && filter==='Incomplete') return  <Text style={styles.incompletecount}>{incompleteTask.todos.length}</Text>
      return null
    }
    
    return [
      {name: FiltersTypes.ALL, action: showAll},
      {name: FiltersTypes.COMPLETED, action: showCompleted},
      {name: FiltersTypes.INCOMPLETE, action: showIncomplete}
    ].map((filter, key) => {
      var style = [styles.button];
      if (filterShow === filter.name) {
        style.push(styles.current);
      }
      return (
        <TouchableOpacity
            key={key}
          style={style}
          onPress={filter.action}>
            <Text key={key} style={styles.text}>{capitalize(filter.name)}</Text>
          { displayIncomplete(capitalize(filter.name))}
        </TouchableOpacity>
      )
    });
  }
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#81c04d',
    flexDirection: 'row',
    position: 'absolute',
    bottom:0
  },
  button: {
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
  },
  text: {
    flex: 1,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  current: {
    backgroundColor: '#70a743'
  },
  incompletecount: {
    color: '#000',
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

const mapDispatchToProps = dispatch => ({
    showAll: () => dispatch(showAll()),
    showCompleted: () => dispatch(showCompleted()),
    showIncomplete: () => dispatch(showIncomplete()),
})

const mapStateToProps = state => {
  const { filterShow } = state;
  const incompleteTask = {todos: todoFilter(state, 'INCOMPLETE')};
  return { incompleteTask, filterShow };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
