import { UniqueEntityID } from "./unique-entity-id"

export abstract class Entity<Props> {
  private readonly _id: UniqueEntityID
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props
    this._id = id ?? new UniqueEntityID()
  }

  public equals(entity: Entity<any>) {
    if (entity === this) {
      return true
    }

    return entity.id === this._id
  }
}
