/**
 * Namespace: http://schemas.openxmlformats.org/officeDocument/2006/relationships
 * Source:    shared-relationshipReference.xsd
 *
 * This schema only defines a single simpleType plus a set of globally
 * reusable attribute declarations, so we expose them as simple string
 * aliases rather than classes.
 */

export type ST_RelationshipId = string;

export interface RelationshipAttributes {
  id?: ST_RelationshipId;
  embed?: ST_RelationshipId;
  link?: ST_RelationshipId;
  dm?: ST_RelationshipId;
  lo?: ST_RelationshipId;
  qs?: ST_RelationshipId;
  cs?: ST_RelationshipId;
  blip?: ST_RelationshipId;
  pict?: ST_RelationshipId;
  href?: ST_RelationshipId;
  topLeft?: ST_RelationshipId;
  topRight?: ST_RelationshipId;
  bottomLeft?: ST_RelationshipId;
  bottomRight?: ST_RelationshipId;
}
