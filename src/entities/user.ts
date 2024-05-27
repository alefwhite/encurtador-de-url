import { Entity } from "@/entities/entity"
import { UniqueEntityID } from "@/entities/unique-entity-id"

type UserProps = {
  name: string
  email: string
  password: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date | null
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get created_at() {
    return this.props.created_at
  }

  get updated_at() {
    return this.props.updated_at
  }

  get deleted_at() {
    return this.props.deleted_at
  }

  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User(props, id)
    return user
  }

  static restore(props: UserProps, id: string) {
    const user_id = new UniqueEntityID(id)
    const user = new User(props, user_id)
    return user
  }
}
