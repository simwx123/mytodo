import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import { editTodo, toggleTodo, removeTodo } from '../actions/actions'
import { connect } from 'react-redux'

class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      todoValue: props.todo
    }
    this.startEdit = this.startEdit.bind(this)
    this.finishEdit = this.finishEdit.bind(this)
  }

  startEdit() {
    this.setState({ isEditing: true })
  }

  finishEdit() {
    const { todoValue } = this.state
    const { id } = this.props
    editTodo(todoValue, id)
    this.setState({ isEditing: false })
  }

  render() {
    const { isEditing, todoValue } = this.state
    const { id, isCompleted, toggleTodo, removeTodo } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => toggleTodo(id)}>
            <Text style={styles.button}>{ isCompleted ? '✅' : '⬜' }</Text>
          </TouchableOpacity>
          {isEditing
            ? <TextInput value={todoValue} 
                style={[styles.text, isCompleted ? styles.completed : styles.text]}
                returnKeyType={'done'}
                onBlur={this.finishEdit}
                onChangeText={(newText) => this.setState({ todoValue: newText })}
                autoCorrect={false} 
                autoFocus = {true}/>
            : <Text style={[styles.text, isCompleted ? styles.completed : styles.text]}>{todoValue}</Text>
          }
        </View>
        <View style={styles.buttonContainer}>
          {isEditing
            ? <TouchableOpacity onPressOut={this.finishEdit}>
                <View style={styles.button}>
                  <Text>🆗</Text>
                </View>
              </TouchableOpacity>
            : <TouchableOpacity onPressOut={this.startEdit}>
                <View style={styles.button}>
                  <Text>✏️</Text>
                </View>
              </TouchableOpacity>
          }  
          <TouchableOpacity onPress={() => removeTodo(id)}>
            <View style={styles.button}>
              <Text>❌</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  editTodo: (todoValue, id) => dispatch(editTodo(todoValue, id)),
  toggleTodo: id => dispatch(toggleTodo(id)),
  removeTodo: id => dispatch(removeTodo(id))
})

export default connect(null, mapDispatchToProps)(TodoList)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#a9a9a9',
    borderBottomWidth: 0.5,
    padding: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '300',
    paddingLeft: 5
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#C0C0C0'
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  button: {
    padding: 10
  }
})
