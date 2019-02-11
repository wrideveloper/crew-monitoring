import React, { Component } from "react"
import { RouteComponentProps } from "react-router"
import { Button, Card, Form, Input } from "semantic-ui-react"
import { Consumer } from "../../App"
import { AdminService } from "../../services/AdminService"

interface IState {
  input: {
    username: string
    password: string,
  }
}

export default class Login extends Component<RouteComponentProps, IState> {
  public state: IState = {
    input: {
      username: "",
      password: "",
    },
  }

  public loginService = new AdminService()

  public redirectIfAuthenticated(isLoggedIn: boolean) {
    if (isLoggedIn) this.props.history.push("/")
  }

  public changeValue(value: string, name: "username" | "password") {
    const { input } = this.state
    input[name] = value
    this.setState({ input })
  }

  public login(context: IAppContext) {
    const { username, password } = this.state.input
    this.loginService.login(username, password).then((data) => {
      if (data.success) {
        context.setToken(data.token!)
        this.props.history.push("/")
      } else {
        alert("username atau password salah")
      }
    })
  }

  public render() {
    return (
      <Consumer>
        {(context) => {
          this.redirectIfAuthenticated(context!.isLoggedIn())
          return (
            <div style={styles.container}>
              <Card>
                <Card.Content>
                  <Card.Header textAlign="center">Login Crew</Card.Header>
                  <Form style={styles.form}>
                    <Form.Field>
                      <Input
                        label="Username"
                        value={this.state.input.username}
                        onChange={(event) =>
                          this.changeValue(event.target.value, "username")
                        }
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        label="Password"
                        type="password"
                        value={this.state.input.password}
                        onChange={(event) =>
                          this.changeValue(event.target.value, "password")
                        }
                      />
                    </Form.Field>
                    <Form.Field>
                      <Button
                        primary
                        fluid
                        content="Login"
                        onClick={() => this.login(context!)}
                      />
                    </Form.Field>
                  </Form>
                </Card.Content>
              </Card>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

const styles = {
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    marginTop: 15,
  },
}
