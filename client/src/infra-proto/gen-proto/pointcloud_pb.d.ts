import * as jspb from 'google-protobuf'



export class Point extends jspb.Message {
  getX(): number;
  setX(value: number): Point;

  getY(): number;
  setY(value: number): Point;

  getZ(): number;
  setZ(value: number): Point;

  getR(): number;
  setR(value: number): Point;
  hasR(): boolean;
  clearR(): Point;

  getG(): number;
  setG(value: number): Point;
  hasG(): boolean;
  clearG(): Point;

  getB(): number;
  setB(value: number): Point;
  hasB(): boolean;
  clearB(): Point;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Point.AsObject;
  static toObject(includeInstance: boolean, msg: Point): Point.AsObject;
  static serializeBinaryToWriter(message: Point, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Point;
  static deserializeBinaryFromReader(message: Point, reader: jspb.BinaryReader): Point;
}

export namespace Point {
  export type AsObject = {
    x: number,
    y: number,
    z: number,
    r?: number,
    g?: number,
    b?: number,
  }

  export enum RCase { 
    _R_NOT_SET = 0,
    R = 4,
  }

  export enum GCase { 
    _G_NOT_SET = 0,
    G = 5,
  }

  export enum BCase { 
    _B_NOT_SET = 0,
    B = 6,
  }
}

export class PointCloud extends jspb.Message {
  getPointsList(): Array<Point>;
  setPointsList(value: Array<Point>): PointCloud;
  clearPointsList(): PointCloud;
  addPoints(value?: Point, index?: number): Point;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PointCloud.AsObject;
  static toObject(includeInstance: boolean, msg: PointCloud): PointCloud.AsObject;
  static serializeBinaryToWriter(message: PointCloud, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PointCloud;
  static deserializeBinaryFromReader(message: PointCloud, reader: jspb.BinaryReader): PointCloud;
}

export namespace PointCloud {
  export type AsObject = {
    pointsList: Array<Point.AsObject>,
  }
}

export class VoxelFilterInput extends jspb.Message {
  getResolution(): number;
  setResolution(value: number): VoxelFilterInput;

  getPointcloud(): PointCloud | undefined;
  setPointcloud(value?: PointCloud): VoxelFilterInput;
  hasPointcloud(): boolean;
  clearPointcloud(): VoxelFilterInput;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VoxelFilterInput.AsObject;
  static toObject(includeInstance: boolean, msg: VoxelFilterInput): VoxelFilterInput.AsObject;
  static serializeBinaryToWriter(message: VoxelFilterInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VoxelFilterInput;
  static deserializeBinaryFromReader(message: VoxelFilterInput, reader: jspb.BinaryReader): VoxelFilterInput;
}

export namespace VoxelFilterInput {
  export type AsObject = {
    resolution: number,
    pointcloud?: PointCloud.AsObject,
  }
}

