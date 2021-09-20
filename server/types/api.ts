import type {
  DeskId,
  EditionId,
  MessageId,
  ProjectId,
  ReplyId,
  RevisionId,
  WorkId,
} from './branded'

export type ApiProject = {
  id: ProjectId
  name: string
}

export type ApiWork = {
  id: WorkId
  name: string
  ext?: string
  path: string
}

export type ApiDesk = {
  id: DeskId
  name: string
  works: ApiWork[]
}

export type ApiRevision = {
  id: RevisionId
  editions: {
    id: EditionId
  }[]
  messages: {
    id: MessageId
  }[]
}

export type ApiMessage = {
  id: MessageId
  content: string
  submitDate: number
  userName: string
  replyList: { replyId: ReplyId; replys: ApiReply[] }[]
}

export type ApiReply = {
  id: ReplyId
  content: string
  replyDate: number
  userName: string
}

export type BrowserApiWholeData = {
  projects: ApiProject[]
  desksList: { projectId: ProjectId; desks: ApiDesk[] }[]
  revisionsList: { projectId: ProjectId; workId: WorkId; revisions: ApiRevision[] }[]
  messagesList: { revisionId: RevisionId; messages: ApiMessage[] }[]
}

export type ProjectApiData = {
  projectId: ProjectId
  name: string
  desks: ApiDesk[]
  revisions: ApiRevision[] | undefined
  messages: ApiMessage[] | undefined
}
