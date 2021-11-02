import { createRevision, getDeskId, getRevisions } from '$/service/browser'
import { sendNewWork } from '$/service/s3'
import type { WorkId } from '$/types'
import { createS3SaveWorksPath } from '$/utils/s3'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ params }) => {
    const revisions = await getRevisions(params.workId as WorkId)
    return revisions ? { status: 200, body: revisions } : { status: 404 }
  },
  post: async ({ params, body }) => {
    const deskId = await getDeskId(params.workId as WorkId)
    if (deskId === undefined) return { status: 404 }

    const revision = await createRevision(params.workId as WorkId)
    const data = await sendNewWork({
      uploadFile: body.uploadFile,
      path: createS3SaveWorksPath({
        projectId: body.projectId,
        deskId,
        revisionId: revision.id,
        filename: body.uploadFile.filename,
      }),
    })

    return data.httpStatusCode === 200 ? { status: 201, body: revision } : { status: 400 }
  },
}))