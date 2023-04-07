/* eslint-disable camelcase */
import { Relations } from 'utilities/types/dbTypes';
import Xarrow, { svgCustomEdgeType } from 'react-xarrows';

type Props = {
  relationData: Relations;
  fontSize: number;
};

export default function RelationArrows({ relationData, fontSize }: Props) {
  const { relation, source_column, source_table, target_column, target_table } =
    relationData;

  const CrowsFoot = {
    svgElem: (
      <>
        <path d="M0.00143039 0.566185V0.433373L1.00143 0.433373V0.566185L0.00143039 0.566185Z" />
        <path d="M0.00143039 0.566185V0.433373L1.00143 0.433373V0.566185L0.00143039 0.566185Z" />
        <path d="M0.185391 0.552278L0.249115 0.434076L1.00146 0.839756V0.999756L0.185391 0.552278Z" />
        <path d="M0.185391 0.552278L0.249115 0.434076L1.00146 0.839756V0.999756L0.185391 0.552278Z" />
        <path d="M0.234211 0.563127L0.171182 0.446222L1.00146 -0.000244141V0.15625L0.234211 0.563127Z" />
        <path d="M0.234211 0.563127L0.171182 0.446222L1.00146 -0.000244141V0.15625L0.234211 0.563127Z" />
      </>
    ),
  };
  let headShape: 'arrow1' | svgCustomEdgeType = 'arrow1';
  let tailShape: 'arrow1' | svgCustomEdgeType = 'arrow1';
  let showHead = true;
  let showTail = true;
  if (relation === 'one-to-one') {
    headShape = 'arrow1';
    tailShape = 'arrow1';
  } else if (relation === 'one-to-many') {
    headShape = CrowsFoot;
    showTail = false;
  } else if (relation === 'many-to-one') {
    tailShape = CrowsFoot;
    showHead = false;
  } else if (relation === 'many-to-many') {
    headShape = CrowsFoot;
    tailShape = CrowsFoot;
  }
  return (
    <Xarrow
      headShape={headShape}
      tailShape={tailShape}
      showTail={showTail}
      showHead={showHead}
      path="grid"
      start={`${source_table}.${source_column}`}
      end={`${target_table}.${target_column}`}
      strokeWidth={fontSize / 6.5}
    />
  );
}
