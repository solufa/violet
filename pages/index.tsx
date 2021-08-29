import type { Task } from '$prisma/client'
import useAspidaSWR from '@aspida/swr'
import Head from 'next/head'
import type { ChangeEvent, FormEvent } from 'react'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import UserBanner from '~/components/UserBanner'
import { staticPath } from '~/utils/$path'
import { apiClient } from '~/utils/apiClient'

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledMain = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  text-align: center;
  line-height: 1.15;
  font-size: 4rem;

  a {
    color: #0070f3;
    text-decoration: none;
  }

  a:hover,
  a:focus,
  a:active {
    text-decoration: underline;
  }
`

const StyledBtn = styled.button`
  color: #fff;
  background: #00f;
  border: none;
`

const Tasks = styled.ul`
  width: 300px;
  padding: 0;
  margin: 20px auto 0;
  list-style-type: none;
  text-align: left;

  > li {
    margin-top: 10px;
    border-bottom: 1px solid #eee;
  }
`

const StyledInput = styled.input`
  float: right;
`

const StyledFooter = styled.footer`
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Logo = styled.img`
  margin-left: 0.5rem;
  height: 1em;
`

const Home = () => {
  const { data: tasks, error, mutate } = useAspidaSWR(apiClient.tasks)
  const [label, setLabel] = useState('')
  const inputLabel = useCallback((e: ChangeEvent<HTMLInputElement>) => setLabel(e.target.value), [])

  const createTask = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      if (!label) return

      await apiClient.tasks.post({ body: { label } })
      setLabel('')
      mutate()
    },
    [label]
  )

  const toggleDone = useCallback(async (task: Task) => {
    await apiClient.tasks._taskId(task.id).patch({ body: { done: !task.done } })
    mutate()
  }, [])

  const deleteTask = useCallback(async (task: Task) => {
    await apiClient.tasks._taskId(task.id).delete()
    mutate()
  }, [])

  if (error) return <div>failed to load</div>
  if (!tasks) return <div>loading...</div>

  return (
    <Container>
      <Head>
        <title>frourio-todo-app</title>
        <link rel="icon" href={staticPath.favicon_png} />
      </Head>

      <StyledMain>
        <UserBanner />

        <Title>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </Title>

        <StyledBtn>frourio-todo-app</StyledBtn>

        <div>
          <form style={{ textAlign: 'center' }} onSubmit={createTask}>
            <input value={label} type="text" onChange={inputLabel} />
            <input type="submit" value="ADD" />
          </form>
          <Tasks>
            {tasks.map((task) => (
              <li key={task.id}>
                <label>
                  <input type="checkbox" checked={task.done} onChange={() => toggleDone(task)} />
                  <span>{task.label}</span>
                </label>
                <StyledInput type="button" value="DELETE" onClick={() => deleteTask(task)} />
              </li>
            ))}
          </Tasks>
        </div>
      </StyledMain>

      <StyledFooter>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <Logo src={staticPath.vercel_svg} alt="Vercel Logo" />
        </a>
      </StyledFooter>
    </Container>
  )
}

export default Home
