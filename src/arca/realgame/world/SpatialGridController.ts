import { Component } from '../ecs';
import { SpatialHashGrid } from '../shared';

export class SpatialGridController extends Component {
  client_: any;
  grid_: any;

  constructor(grid: SpatialHashGrid) {
    super();

    this.grid_ = grid;
  }

  Destroy() {
    this.grid_.Remove(this.client_);
    this.client_ = null;
  }

  InitComponent() {
    const pos = [this.parent_._position.x, this.parent_._position.z];

    this.client_ = this.grid_.NewClient(pos, [1, 1]);
    this.client_.entity = this.parent_;
    this._RegisterHandler('update.position', (m) => this._OnPosition(m));
  }

  _OnPosition(msg) {
    this.client_.position = [msg.value.x, msg.value.z];
    this.grid_.UpdateClient(this.client_);
  }

  FindNearbyEntities(range) {
    const results = this.grid_.FindNear(
      [this.parent_._position.x, this.parent_._position.z],
      [range, range]
    );

    return results.filter((c) => c.entity !== this.parent_);
  }
}
