import { PrismaClient } from '@prisma/client'
import { deskData, projectData, revisionData, workData } from './seedData'
import { messageData, replyData } from './seedStreamData'

const prisma = new PrismaClient()
export const main = async () => {
  await Promise.all(
    projectData.map((p) =>
      prisma.project.upsert({
        where: { projectId: p.projectId },
        update: {},
        create: {
          projectId: p.projectId,
          projectName: p.projectName,
          desks: p.desks,
        },
      })
    )
  )

  await Promise.all(
    deskData.map((d) =>
      prisma.desk.upsert({
        where: { deskId: d.deskId },
        create: {
          deskId: d.deskId,
          deskName: d.deskName,
          project: { connect: { projectId: d.project.connect?.projectId } },
        },
        update: {},
      })
    )
  )
  await Promise.all(
    workData.map((w) =>
      prisma.work.upsert({
        where: { workId: w.workId },
        create: { workId: w.workId, workName: w.workName, path: w.path, desk: w.desk },
        update: {},
      })
    )
  )
  await Promise.all(
    revisionData.map((r) =>
      prisma.revision.upsert({
        where: {
          revisionId: r.revisionId,
        },
        update: {},
        create: { revisionId: r.revisionId, work: r.work },
      })
    )
  )
  await Promise.all(
    messageData.map((m) =>
      prisma.message.upsert({
        where: {
          messageId: m.messageId,
        },
        update: {},
        create: {
          messageId: m.messageId,
          userName: m.userName,
          content: m.content,
          revision: m.revision,
        },
      })
    )
  )
  await Promise.all(
    replyData.map((r) =>
      prisma.reply.upsert({
        where: {
          replyId: r.replyId,
        },
        update: {},
        create: {
          replyId: r.replyId,
          userName: r.userName,
          content: r.content,
          message: r.message,
        },
      })
    )
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
