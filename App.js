import React from 'react'
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, ScrollView, TouchableOpacity} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import TodoList from './components/todolist'
import Filter from './components/filter';
import { addTodo } from './actions/actions'
import { connect } from 'react-redux'
import { todoFilter } from "./selectors";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  render() {
    const { text } = this.state
    const { states, addTodo, filter } = this.props
    return (
      <LinearGradient style={styles.container}
        colors={['#4568dc', '#b06ab3']}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Todo List</Text>
        <View style={styles.list} width={Dimensions.get('window').width - 60}>
        <View style={styles.inputBox}>
            <View  style={{flex:4}}>
              <TextInput style={styles.input} 
                placeholder="Add todo"
                value={text}
                onChangeText={(text) => this.setState({ text })}
                onBlur={() => this.setState({ text: '' })}
                onSubmitEditing={() => addTodo(text)}
                returnKeyType={'done'}
                autoCorrect={false} />
            </View>
            <View style={{flex:1}}>
            <TouchableOpacity onPressOut={() => addTodo(text)}>
                <View style={styles.button}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>Add</Text>
                </View>
              </TouchableOpacity>
              </View>
          </View>

          <ScrollView>
            {states && Array.isArray(states.todos) && states.todos.map(todo => 
              <TodoList key={todo.id}
                id={todo.id} 
                {...todo} />
            )}
          </ScrollView>

            <Filter
              activeFilter={filter}
              />
        </View>
      </LinearGradient>
    )
  }
}

const mapStateToProps = state => {
  const { filterShow } = state;
  const filter = filterShow;
  const states = {todos: todoFilter(state, filterShow)};
  return { states, filter };
};

const mapDispatchToProps = dispatch => ({
  addTodo: todo => dispatch(addTodo(todo))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEFA',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 40,
    marginTop: 25, 
    fontWeight: '500'
  },
  list: {
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 10,
    marginTop: 25,
    width: window.width,
  },
  input: {
    fontSize: 24,
    fontWeight: '300'
  },
  inputBox: {
    width: window.width,
    flexDirection:'row', 
    margin: 10, 
    alignItems:'center', 
    justifyContent:'center', 
    borderWidth:1, 
    backgroundColor:'#fff',
  },
  button: {
    padding: 10,
    backgroundColor:'rgb(129, 192, 77)',
  }
})